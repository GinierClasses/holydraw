using System;
using System.IO;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting.Internal;
using thyrel_api;
using thyrel_api.Models;

namespace test_thyrel_api
{
    public class MockScopeFactory : IServiceScopeFactory
    {
        public IServiceScope CreateScope()
        {
            var x = new ServiceScope();
            return x;
        }
    }

    public class ServiceScope : IServiceScope
    {
        public ServiceScope()
        {
            ServiceProvider = null;
        }

        public void Dispose()
        {
        }

        public IServiceProvider ServiceProvider { get; }
    }
}