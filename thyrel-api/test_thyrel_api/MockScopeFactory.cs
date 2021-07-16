using System;
using Microsoft.Extensions.DependencyInjection;

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

        public void Dispose()
        {
        }

        public IServiceProvider ServiceProvider { get; }
    }
}