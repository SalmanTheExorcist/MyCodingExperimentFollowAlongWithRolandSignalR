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

	(A)--> WebSockets: The best transport option
		--> Only transport that offers a true 2-way full-duplex connection between client and server that stays open.
	------------------------------
	
	(B)-->"Server-Sent-Events (SSE)": Uses HTTP Requests 
	-----------------------------------

	(C)-->"Long Polling": For server to client messages, the client does an HTTP request to the server which remains open.
--------------------------------------------------

==>(Note) Update our code to disable transport-negotation, to force use of WebSockets (This is the best transport-option)

	-->
--------------------------------------------------

Course-Module-3
==>Server and Client Features:

	-->Clients can be of any Application type (such as ConsoleApp)

	-->Roland's Sample Apps on GitHub (different branches):
	
		--> git clone --branch OtherClients https://github.com/RolandGuijt/ps-globomantics-signalr.git

		--> git clone --branch Start https://github.com/RolandGuijt/ps-globomantics-signalr.git

		--> git clone --branch master https://github.com/RolandGuijt/ps-globomantics-signalr.git
---------------------------------------------------------------------------

==>For the Client Console App:

	-->NuGet: Microsoft.AspNetCore.SignalR.Client
-----------------------------------------------

==>IHubContext and Caller:

	--> Roland GitHub Repo for AddNewAuction: 
		--> git clone --branch addnewauction https://github.com/RolandGuijt/ps-globomantics-signalr.git
-----------------------------------

==> Client Groups, Context and Connection IDs:

	--> Roland GitHub Repo for "SignalR Client Groups":

		-->  git clone --branch itemgroups https://github.com/RolandGuijt/ps-globomantics-signalr.git
-----------------------------------------------

==>Message Pack Hub Protocol and KeepAlive:

	-->"Message Pack": A binary message protocol, alternative to JSON message. (more efficient than JSON Message)

	-->NuGet package: Microsoft.AspNetCore.SignalR.Protocols.MessagePack

		-->(dotnet-cli):  dotnet add package Microsoft.AspNetCore.SignalR.Protocols.MessagePack --version 8.0.21
	--------------------------------------------

	--> In the Program.cs:
	----------------
		builder.Services.AddSignalR(options =>
    	{
        options.EnableDetailedErrors = true;
        options.MaximumReceiveMessageSize = 1024 * 1024 * 1024;
        
        
    	}
	).AddMessagePackProtocol();
	-----------------------------------------------------
		

	-->JavaScript Library: @microsoft/signalr-protocol-msgpack

		--> npm install @microsoft/signalr-protocol-msgpack
	-----------------------------------------------------

	-->Added in our .cshtml "Scripts" section:

		--> <script src="~/lib/signalr-protocol-msgpack/dist/browser/signalr-protocol-msgpack.min.js"></script>
	-----------------------------------------------------


	-->

==>Exceptions and Logging:

	-->

==>Design Considerations:

	-->
--------------------------------------------------------

Course-Module-4
==>Authentication and Authorization:

==>Cookie Authentication:

	--> Roland GitHub Repo CookieAuth:

		-->  git clone --branch CookieAuth https://github.com/RolandGuijt/ps-globomantics-signalr.git
-----------------------------------------------

==>(dotnet-cli):

	--> dotnet add package Microsoft.AspNetCore.Identity.EntityFrameworkCore --version 8.0.21
	-----------------------------------------------------

	--> dotnet add package Microsoft.EntityFrameworkCore.InMemory --version 8.0.21
	---------------------------------------------------------

	--> dotnet add package Microsoft.AspNetCore.Identity.UI --version 8.0.21
	-----------------------------------------------------------

	--> dotnet add package Microsoft.EntityFrameworkCore.Tools --version 8.0.21
	------------------------------------------------------------

	--> dotnet tool install --global dotnet-aspnet-codegenerator --version 8.0.7

	--> dotnet tool install --global dotnet-ef --version 8.0.21
-----------------------------------------------------------------------------------------------

	--> dotnet aspnet-codegenerator identity -h
	----------------------------------------------------
	
	--> 

==>Token Based Authentication:

	-->Roland GitHub Repo For TokenAuth:
		--> git clone --branch TokenAuth https://github.com/RolandGuijt/ps-globomantics-signalr.git
	---------------------------------------------------------

	-->


==>BFF (Backend-For-Frontend Pattern):

	-->
---------------------------------------------------------

Course-Module-5
==>Hosting and Scaling:

	-->
	
------------------------------------------------------

