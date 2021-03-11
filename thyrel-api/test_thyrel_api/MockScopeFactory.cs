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
            return new ServiceScope();
        }
    }

    public class ServiceScope : IServiceScope
    {
        public ServiceScope()
        {
            ServiceProvider = null;
        }

        public void Dispose() { }

        public IServiceProvider ServiceProvider { get; }
    }
}