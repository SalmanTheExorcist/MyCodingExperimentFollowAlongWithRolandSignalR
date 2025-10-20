using MyFreshlyBakedMVCWebApp.Hubs;
using MyFreshlyBakedMVCWebApp.Models;
using MyFreshlyBakedMVCWebApp.Repositories;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddSignalR(options =>
    {
        options.EnableDetailedErrors = true;
        options.MaximumReceiveMessageSize = 1024 * 1024 * 1024;
        
        
    }
);



builder.Services.AddSingleton<IMyPhotoFancyRepository, MyPhotoFancyInMemoryRepository>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");


app.MapPost("myphotofancy", (MyPhotoFancy myPhotoFancy, IMyPhotoFancyRepository myRepo) =>
{
    myRepo.UpdateExistingMyPhotoFancy(myPhotoFancy);
    return Results.Ok();
});

app.MapGet("myphotofancy", (IMyPhotoFancyRepository myRepo) =>
{
    return Results.Ok(myRepo.GetAll());
    
});



app.MapHub<MySuperFancyHub>("/mysuperfancyhub");


app.Run();
