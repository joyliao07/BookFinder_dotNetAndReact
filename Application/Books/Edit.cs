using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Books
{
    public class Edit
    {
        public class Command : IRequest
        {
            public Book Book { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _data;
            private readonly IMapper _mapper;
            public Handler(DataContext data, IMapper mapper)
            {
                _mapper = mapper;
                _data = data;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var book = await _data.Books.FindAsync(request.Book.Id);
                _mapper.Map(request.Book, book);
                await _data.SaveChangesAsync();
                return Unit.Value;
            }
        }

    }
}