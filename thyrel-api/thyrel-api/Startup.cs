using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using thyrel_api.Models;
using System;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

namespace thyrel_api
{
    public class Startup
    {
        public CorsPolicy GenerateCorsPolicy()
        {
            var corsBuilder = new CorsPolicyBuilder();
            corsBuilder.AllowAnyHeader();
            corsBuilder.AllowAnyMethod();
            corsBuilder.AllowAnyOrigin(); // For anyone access.
                                          //corsBuilder.WithOrigins("http://localhost:56573"); // for a specific url. Don't add a forward slash on the end!
            return corsBuilder.Build();
        }


        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContextPool<TestContext>(
               dbContextOptions => dbContextOptions
                   .UseMySql(
                       // Replace with your connection string.
                       "server=localhost;port=8080;user=root;password=root;database=test",
                       // Replace with your server version and type.
                       // For common usages, see pull request #1233.
                       new MySqlServerVersion(new Version(8, 0, 23)), // use MariaDbServerVersion for MariaDB
                       mySqlOptions => mySqlOptions
                           .CharSetBehavior(CharSetBehavior.NeverAppend))
                   .EnableDetailedErrors()
                   .EnableSensitiveDataLogging());

            // allow controlled to be used as injected props
            services.AddMvcCore().AddControllersAsServices();
            // add controller in application
            services.AddControllers();
            // add cors to alows web server to get informations
            services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins", GenerateCorsPolicy());
            });


            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "thyrel_api", Version = "v1" });
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

            app.UseHttpsRedirection();

            app.UseRouting();
            // allow cors of all origins
            app.UseCors("AllowAllOrigins");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
