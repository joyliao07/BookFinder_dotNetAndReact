using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using Persistence;

namespace Application.Books
{
    public class Delete
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _data;
            public Handler(DataContext data)
            {
                _data = data;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var book = await _data.Books.FindAsync(request.Id);
                _data.Remove(book);
                await _data.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}