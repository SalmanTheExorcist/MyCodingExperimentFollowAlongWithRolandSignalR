
# Use the official ASP.NET Core runtime as a parent image
FROM mcr.microsoft.com/dotnet/aspnet:8.0

# Set the working directory in the container
WORKDIR /app

# Copy the published application files to the container
COPY ./bin/Release/net8.0/linux-x64/publish/ .

# Expose the port the app runs on
EXPOSE 80

# Run the application
ENTRYPOINT ["dotnet", "MyFreshlyBakedMVCWebApp.dll"]


#docker run -d -p 8080:80 myfreshlybakedmvcwebapp
