using System.Threading;
using System.Threading.Tasks;
using Application.Interface;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
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
            private readonly IUserNameAccessor _userAccessor;
            public Handler(DataContext data, IUserNameAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _data = data;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _data.Users.FirstOrDefaultAsync(
                    x => x.UserName == _userAccessor.GetUserName()
                );

                request.Book.User = user;
                // request.Book.User.UserName = user.UserName;

                _data.Add(request.Book);
                await _data.SaveChangesAsync();
                return Unit.Value;
            }
        }
    }
}