using Application.Books;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class BookMapper : Profile
    {
        public BookMapper()
        {
            CreateMap<Book, Book>();  

            CreateMap<Book, BookDto>();

            CreateMap<User, Books.ReaderProfile>()
                .ForMember(d => d.DisplayName, opt => opt.MapFrom(src => src.DisplayName))
                .ForMember(d => d.Username, opt => opt.MapFrom(src => src.UserName));
        }
    }
}