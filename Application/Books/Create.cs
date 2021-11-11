using System.Threading;
using System.Threading.Tasks;
using Domain;
using MediatR;
using Persistence;

namespace Application.Books
{
    public class Create
    {
        public class Command : IRequest
        {
            public Book Book { get; set; }
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
                _data.Add(request.Book);
                await _data.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}