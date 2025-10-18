#My Coding Experiement Following Along With The ASP.NET Core SignalR Fundamentals Training Course by Roland Guijt
----------------------------------------------------------

==>**Course-URL: https://app.pluralsight.com/library/courses/asp-dot-net-core-6-signalr-fundamentals/table-of-contents**

**(GitHub - Course Sample Code)==> https://github.com/RolandGuijt/ps-globomantics-signalr**

**(Nice .gitignore file for us to use)==> https://raw.githubusercontent.com/SalmanTheExorcist/ps-globomantics-signalr/refs/heads/master/.gitignore**

==>

------------My Quick Notes Below-----------------


Course-Module-2
==>The Power of SignalR:

==>SignalR and Real-Time Web Applications:

==>Hub and Clients:

	-->

==>Adding a Hub to an Existing Web App:

	--> Cloing the "Start" branch from Roland's Git Repo:
		(Note: the "master" branch is the final version)

		--> git clone --branch Start https://github.com/RolandGuijt/ps-globomantics-signalr.git
-----------------------------------------------------

	-->(Steps):
		-->Added "Hubs"
		
		-->Added class "MySuperFancyHub.cs" in the "/Hubs/"
		
		--> AuctionHub class inherits from "Hub" class
			("Microsoft.AspNetCore.SignalR.Hub")
		-----------------------------------------------------
		
		--> In the "Program.cs" add SignalR service:
			--> "builder.Services.AddSignalR()"

		--> In "Program.cs" create an EndPoint for the "Hub":
			--> app.MapHub<MySuperFancyHub>("/mysuperfancyhub")
	-----------------------------------------------------
	
		-->Now in our "MySuperFancyHub.css" class we add the needed methods to notify clients:

			--> public async Task MyFancyHubMethod(MyFancyObject myFancyObject){
				await Clients.All.SendAsync("MySomeFunctioName",myFancyObject);
			}
	-----------------------------------------------------
	-->(Note Above): Our "MyFancyHubMethod()" is a "Hub" method, which can be called remotely by clients.
---------------------------------------------------------------------------------

==>Remote Procedure Call (RPC) and Hub Protocol:

	(Note)--> "Procedure" another word for "Method" or "Function".

==> JSON Hub Protocol:

	--> {
		"type": 1,
		"target": "<Name-Of-RPC-Method",
		"arguments": [{}]
	}


==>Installing SignalR JavaScript Client Library:

	--> npm install @microsoft/signalr

	-->(We need to add it to our "wwwroot/js/" folder or "wwwroot/lib/"): 
	
		--> ./node_modules/@microsoft/signalr/dist/browser/
------------------------------------------------------

==>Calling Hub Methods and Responding to Hub Calls:

	-->
------------------------------------------------------

==>Transports and Negotiation:

    -->
------------------------------------------------------

