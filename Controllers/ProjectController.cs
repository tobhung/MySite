using Microsoft.AspNetCore.Mvc;
using MySite.Models;

namespace MySite.Controllers;

public class ProjectController : Controller
{
    private readonly BaseDBContext _context;
    private readonly IWebHostEnvironment _hostingEnvironment;

    public ProjectController(BaseDBContext context, IWebHostEnvironment env)
    {
        _context = context;
        _hostingEnvironment = env;
    }

    public async Task<IActionResult> Index()
    {
        return View();
    }

}