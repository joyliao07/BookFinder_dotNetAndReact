using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Books;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // [AllowAnonymous]
    public class BooksController : BaseApiController
    {
        // private readonly IMediator _mediator;
        // public BooksController(IMediator mediator)
        // {
        //     _mediator = mediator;
        // }

        // .../api/books
        [HttpGet]
        public async Task<ActionResult<List<BookDto>>> GetBooks()
        {
            // return await _mediator.Send(new BookList.Query());
            return await Mediator.Send(new BookList.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookDto>> GetBook(Guid id)
        {
            // return await _context.Books.FindAsync(id);
            return await Mediator.Send(new Details.Query{Id=id});
        }

        [HttpPost]
        public async Task<ActionResult> CreateBook(Book book)
        {
            return Ok(await Mediator.Send(new Create.Command{Book = book}));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateBook(Guid id, Book book)
        {
            book.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Book = book}));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBook(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command{Id = id}));
        }
    }
}