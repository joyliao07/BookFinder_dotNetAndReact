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
                    BookTitle = "Vertical Gardening",
                    BookSubtitle = "Grow Up, Not Out, for More Vegetables and Flowers in Much Less Space",
                    Author = "Derek Fell",
                    Thumbnail = "http://books.google.com/books/publisher/content?id=IYWmAgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE71N0Yl86cgmDKtduP5H9nQQRikJWnluELbr73ScFoO8GIozqVZNNXE5q_jVAsFb-4v3enyTWzLC4NnZ-uEHAmsoB6oLvvQyIVCDQREgpxRai5mh5TcfrVN3iJAOinrUPo4ztvB8&source=gbs_api",
                    Notes = "",
                    BookUrl = "https://www.googleapis.com/books/v1/volumes/IYWmAgAAQBAJ",
                    Date = DateTime.Now,
                    UserName = "joyce",
                    Status = "To Read",
                    Favorite = false
                },
                new Book
                {
                    BookTitle = "Blank Recipe Book: My Journal of Recipes",
                    BookSubtitle = "",
                    Author = "Strawberry Patch Cookbooks",
                    Thumbnail = "",
                    Notes = "",
                    BookUrl = "https://www.googleapis.com/books/v1/volumes/goPyAQAACAAJ",
                    Date = DateTime.Now,
                    UserName = "joyce",
                    Status = "Reading Now",
                    Favorite = false
                },
                new Book
                {
                    BookTitle = "The New York Times Cooking No-Recipe Recipes",
                    BookSubtitle = "[A Cookbook]",
                    Author = "Sam Sifton",
                    Thumbnail = "http://books.google.com/books/publisher/content?id=q47sDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE72fsq31zKSJ6WwnOcn6y8K1g7zraNn285MMxV1SmOQ7CtycN-Mw1KloeJ4T-s-VJIbgWl4LDUHnYT0fQyABBDzCn5pyjwuzFRAhW2Rx1dGUn6LJDSQwwKqAnhMPL7gLJ7e9J6Xy&source=gbs_api",
                    Notes = "Need to get before Thanksgiving",
                    BookUrl = "https://www.googleapis.com/books/v1/volumes/q47sDwAAQBAJ",
                    Date = DateTime.Now,
                    UserName = "joyce",
                    Status = "Done Reading",
                    Favorite = false
                },
                new Book
                {
                    BookTitle = "Night Sky",
                    BookSubtitle = "A Field Guide to the Constellations",
                    Author = "Jonathan Poppele",
                    Thumbnail = "http://books.google.com/books/publisher/content?id=3IgWDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE70u3NKLJpofm94bCfAdhcu_SI7BSrw3g0IcZ82elhLceSw2HTIqFQ8RFeJyxQ8Q5xBkoeEPD1_xkVHGV1-xWaQ6MjfvnTSd_mEELP0be3jjoSCFQL5uIKaZOM83WUPt6r-D2XcX&source=gbs_api",
                    Notes = "This is my favorite!",
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