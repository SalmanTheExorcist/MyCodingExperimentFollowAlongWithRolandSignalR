using System.Net.WebSockets;
using Microsoft.AspNetCore.SignalR;
using MyFreshlyBakedMVCWebApp.Models;

namespace MyFreshlyBakedMVCWebApp.Hubs;

public class MySuperFancyHub : Hub
{
    public async Task NotifyNewMyPhotoFancy(MyPhotoFancyNotify myPhotoFancyNotify)
    {
        await Clients.All.SendAsync("ReceiveNewMyPhotoFancy", myPhotoFancyNotify);
    }

    public void NotifyNewVideoFrame(string strBase64VideoFrameImage)
    {
        Console.WriteLine("Hub Method: NotifyNewVideoFrame()");
       // await Clients.All.SendAsync("ReceiveNewVideoFrame", strBase64VideoFrameImage);
    }

}