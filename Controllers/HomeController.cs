using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using MyFreshlyBakedMVCWebApp.Models;
using MyFreshlyBakedMVCWebApp.Repositories;

namespace MyFreshlyBakedMVCWebApp.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly IMyPhotoFancyRepository _myPhotoFancyRepository;

    public HomeController(ILogger<HomeController> logger,
                          IMyPhotoFancyRepository myPhotoFancyRepository)
    {
        _logger = logger;
        _myPhotoFancyRepository = myPhotoFancyRepository;
    }

    public IActionResult Index()
    {
        return View();
    }


    public IActionResult ImagesRelatedStuff()
    {
        return View();
    }

    public IActionResult MyFancyPlayground()
    {
        var listMyPhotoFancies = _myPhotoFancyRepository.GetAll();
        return View(listMyPhotoFancies);
    }


    public IActionResult MyWebCamStreamStartPage()
    {
        return View();
    }
    
    public IActionResult MyWebCamStreamViewingPage()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
