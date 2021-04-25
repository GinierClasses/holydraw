using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using thyrel_api.Websocket;
using System;
using System.Net;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using thyrel_api.Models;

namespace thyrel_api
{
    public class Startup
    {
        private IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private static CorsPolicy GenerateCorsPolicy()
        {
            var corsBuilder = new CorsPolicyBuilder();
            corsBuilder.AllowAnyHeader();
            corsBuilder.AllowAnyMethod();
            corsBuilder.AllowAnyOrigin(); // For anyone access.
            // corsBuilder.WithOrigins("http://localhost:56573"); // for a specific url. Don't add a forward slash on the end!
            return corsBuilder.Build();
        }

        public void ConfigureServices(IServiceCollection services)
        {
            DotNetEnv.Env.Load(".env");

            services.AddSingleton<IWebsocketHandler, WebsocketHandler>();
            
            // for deployment
            services.Configure<ForwardedHeadersOptions>(options =>
            {
              options.KnownProxies.Add(IPAddress.Parse("10.0.0.100"));
            });

            var contractResolver = new DefaultContractResolver
            {
                NamingStrategy = new CamelCaseNamingStrategy()
            };
            // it's a config for stop infinite looping
            services.AddControllersWithViews()
                .AddNewtonsoftJson(options =>
                    {
                        options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                        options.SerializerSettings.ContractResolver = contractResolver;
                        options.SerializerSettings.Formatting = Formatting.Indented;
                        options.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Utc;
                    }
                );


            var connectionString = _configuration.GetConnectionString("thyrel_db") == null
                ? Environment.GetEnvironmentVariable("THYREL_CONNECTION_STRING")
                : _configuration.GetConnectionString("thyrel_db"); 

            services.AddDbContextPool<HolyDrawDbContext>(
                dbContextOptions => dbContextOptions
                    .UseMySql(
                        connectionString ?? throw new InvalidOperationException("Connection string is empty."),
                        new MySqlServerVersion(new Version(8, 0, 23)),
                        mySqlOptions => mySqlOptions
                            .CharSetBehavior(CharSetBehavior.NeverAppend))
                    .EnableSensitiveDataLogging()
                    .EnableDetailedErrors());

            // allow controlled to be used as injected props
            // services.AddMvcCore().AddControllersAsServices();
            // add controller in application
            services.AddControllers();
            // add cors to allows web server to get information
            services.AddCors(options => { options.AddPolicy("AllowAllOrigins", GenerateCorsPolicy()); });

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "thyrel_api", Version = "v1"});
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "thyrel_api v1"));
            }

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });

            var webSocketOptions = new WebSocketOptions()
            {
                KeepAliveInterval = TimeSpan.FromSeconds(120),
            };

            app.UseWebSockets(webSocketOptions);

            app.UseHttpsRedirection();
            app.UseRouting();
            // allow cors of all origins
            app.UseCors("AllowAllOrigins");
            app.UseAuthorization();
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}