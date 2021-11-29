using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
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
            public Handler(DataContext data, IMapper mapper)
            {
                _mapper = mapper;
                _data = data;
            }

            public async Task<List<BookDto>> Handle(Query request, CancellationToken cancellationToken)
            {

                List<Book> books = await _data.Books
                            .Include(x => x.User)
                            .ToListAsync();
                
                var bookDtoList = _mapper.Map<List<BookDto>>(books);

                return bookDtoList;
            }
        }
    }
}