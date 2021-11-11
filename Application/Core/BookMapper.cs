using AutoMapper;
using Domain;

namespace Application.Core
{
    public class BookMapper : Profile
    {
        public BookMapper()
        {
            CreateMap<Book, Book>();   
        }
    }
}