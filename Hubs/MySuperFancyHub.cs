using Microsoft.AspNetCore.SignalR;
using MyFreshlyBakedMVCWebApp.Models;

namespace MyFreshlyBakedMVCWebApp.Hubs;

public class MySuperFancyHub : Hub
{
    public async Task NotifyNewMyPhotoFancy(MyPhotoFancyNotify myPhotoFancyNotify)
    {
        await Clients.All.SendAsync("ReceiveNewMyPhotoFancy", myPhotoFancyNotify);
    }
}