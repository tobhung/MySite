using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySite.Models;

namespace MySite.Controllers;

public class AdminProjectController : Controller
{
    private readonly BaseDBContext _context;
    private readonly IWebHostEnvironment _hostingEnvironment;

    public AdminProjectController(BaseDBContext context, IWebHostEnvironment env)
    {
        _context = context;
        _hostingEnvironment = env;
    }

    public async Task<IActionResult> Index()
    {
        var items = await _context.Projects.Where(x => x.Del == false).ToListAsync();
        return View(items);
    }

    [HttpGet]
    public IActionResult Create()
    {
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(Project item)
    {

        if (ModelState.IsValid)
        {
            item.Created = DateTime.UtcNow;
            item.Updated = DateTime.UtcNow;

            _context.Add(item);
            await _context.SaveChangesAsync();


            return RedirectToAction(nameof(Index));
        }
        return View(item);
    }
    
    [HttpGet]
    public IActionResult Edit()
    {
        return View();
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(int ID)
    {
        var item = _context.Projects.Find(ID);

        if (item == null) return NotFound();    

        if (ModelState.IsValid)
        {
            item.Created = DateTime.UtcNow;
            item.Updated = DateTime.UtcNow;

            _context.Add(item);
            await _context.SaveChangesAsync();


            return RedirectToAction(nameof(Index));
        }
            return View(item);
    }
}