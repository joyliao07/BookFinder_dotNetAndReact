using System;

namespace Application.Books
{
    public class BookDto
    {
        public Guid Id { get; set; }
        
        public string BookTitle { get; set; }

        public string BookSubtitle { get; set; }

        public string Author { get; set; }

        public string Thumbnail { get; set; }

        public string Notes { get; set; }

        public string BookUrl { get; set; }

        public DateTime Date { get; set; }

        public string Status { get; set; }

        public bool Favorite { get; set; }

        public ReaderProfile User { get; set; }
    }
}