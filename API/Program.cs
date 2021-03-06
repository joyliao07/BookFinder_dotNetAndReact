using System;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var hostBuilt = CreateHostBuilder(args).Build();

            using var hostScoped = hostBuilt.Services.CreateScope();

            var hostWithServices = hostScoped.ServiceProvider;

            try
            {
                var hostWithContext = hostWithServices.GetRequiredService<DataContext>();
                var userManager = hostWithServices.GetRequiredService<UserManager<User>>();
                await hostWithContext.Database.MigrateAsync();
                await Seed.SeedData(hostWithContext, userManager);
            }
            catch (Exception err)
            {
                var logger = hostWithServices.GetRequiredService<ILogger<Program>>();
                logger.LogError(err, "An error occured during migration");
            }
            await hostBuilt.RunAsync();

        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
