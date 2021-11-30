using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Books
{
    public class Details
    {
        public class Query : IRequest<BookDto>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, BookDto>
        {
            private readonly DataContext _data;
            private readonly IMapper _mapper;
            public Handler(DataContext data, IMapper mapper)
            {
                _mapper = mapper;
                _data = data;
            }

            public async Task<BookDto> Handle(Query request, CancellationToken cancellationToken)
            {
                var book = await _data.Books
                            .ProjectTo<BookDto>(_mapper.ConfigurationProvider)
                            .FirstOrDefaultAsync(x => x.Id == request.Id);
                return book;
            }
        }


    }
}