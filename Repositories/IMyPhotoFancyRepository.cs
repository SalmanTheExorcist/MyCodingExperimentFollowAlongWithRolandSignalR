using MyFreshlyBakedMVCWebApp.Models;

namespace MyFreshlyBakedMVCWebApp.Repositories;

public interface IMyPhotoFancyRepository
{
    IEnumerable<MyPhotoFancy> GetAll();
  // void UpdateExistingMyPhotoFancy(int myPhotoFancyId,
  //                                 string newFancyBase64URL,
  //                                 string newFancyDescription);

  void UpdateExistingMyPhotoFancy(MyPhotoFancyUpdateDTO myPhotoFancyUpdateDTO);

  MyPhotoFancy AddNewMyPhotoFancy(MyPhotoFancyCreateDTO myPhotoFancyCreateDTO);
  
}
