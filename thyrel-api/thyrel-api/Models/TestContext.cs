using Microsoft.EntityFrameworkCore;

namespace thyrel_api.Models
{
    public class TestContext : DbContext
    {
        public DbSet<Test> TestItems { get; set; }

        public TestContext(DbContextOptions<TestContext> options)
            : base(options)
        {
        }
    }
}
