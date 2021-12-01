using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Application.Interface;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Books
{
    public class BookList
    {
        public class Query : IRequest<List<BookDto>>
        {
        }

        public class Handler : IRequestHandler<Query, List<BookDto>>
        {
            private readonly DataContext _data;
            private readonly IMapper _mapper;
            private readonly IUserNameAccessor _accessor;
            public Handler(DataContext data, IMapper mapper, IUserNameAccessor accessor)
            {
                _accessor = accessor;
                _mapper = mapper;
                _data = data;
            }

            public async Task<List<BookDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var books = await _data.Books
                            .ProjectTo<BookDto>(_mapper.ConfigurationProvider)
                            .ToListAsync();
                // var bookDtoList = _mapper.Map<List<BookDto>>(books);
                Console.WriteLine(_accessor.GetUserName() + " Add book ");
                Console.WriteLine("Add book ");
                Console.WriteLine("Add book ");
                var booksForReader = new List<BookDto>();
                foreach(var book in books)
                {
                    if (book.User != null) 
                    {
                        if (book.User.Username == _accessor.GetUserName())
                        {
                            Console.WriteLine("Add book: " + book.BookTitle);
                            booksForReader.Add(book);
                        }
                    }
                }

                return booksForReader;
            }
        }
    }
}