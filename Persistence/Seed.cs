using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {

            if (context.Books.Any()) return;
            
            var books = new List<Book>
            {
                new Book
                {
                    BookUrl = "https://www.googleapis.com/books/v1/volumes/IYWmAgAAQBAJ",
                    Date = DateTime.Now,
                    UserName = "joyce",
                    Status = "To Read",
                    Favorite = false
                },
                new Book
                {
                    BookUrl = "https://www.googleapis.com/books/v1/volumes/goPyAQAACAAJ",
                    Date = DateTime.Now,
                    UserName = "joyce",
                    Status = "Reading Now",
                    Favorite = false
                },
                new Book
                {
                    BookUrl = "https://www.googleapis.com/books/v1/volumes/q47sDwAAQBAJ",
                    Date = DateTime.Now,
                    UserName = "joyce",
                    Status = "Done Reading",
                    Favorite = false
                },
                new Book
                {
                    BookUrl = "https://www.googleapis.com/books/v1/volumes/3IgWDgAAQBAJ",
                    Date = DateTime.Now,
                    UserName = "joyce",
                    Status = "To Read",
                    Favorite = true
                }
            };

            await context.Books.AddRangeAsync(books);
            await context.SaveChangesAsync();
        }
    }
}