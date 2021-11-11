using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Books;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class BooksController : BaseApiController
    {
        // private readonly IMediator _mediator;
        // public BooksController(IMediator mediator)
        // {
        //     _mediator = mediator;
        // }

        [HttpGet]
        public async Task<ActionResult<List<Book>>> GetBooks()
        {
            // return await _mediator.Send(new BookList.Query());
            return await Mediator.Send(new BookList.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Book>> GetBook(Guid id)
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