using System;
using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Books
{
    public class Details
    {
        public class Query : IRequest<Book>
        { 
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Book>
        {
            private readonly DataContext _data;
            public Handler(DataContext data)
            {
                _data = data;
            }

            public async Task<Book> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _data.Books.FindAsync(request.Id);
            }
        }


    }
}