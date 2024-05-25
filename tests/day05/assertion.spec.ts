/*
auto-retrying assertions --> assertion pass olana kadar veya assert süresi dolana kadar 
beklenene sonuca ulaşmak için tekrar tekrar dener , bunda sadece locator kullanılır

--çoğu zaman bu türün kullanılması önerilir


non-retrying assertions --> herhangi bir koşulun test edilmesi için kullanılır , otomatik olarak yeniden denemez
--expect in içine herhangi bir türde veri koyabiliriz strin koyabiliriz , int koyabiliriz ,  vs

yani özetle : expectin içerisine locator kuyuyorsak  auto-retrying assertions (locator) diyoruz 
              eğer bir veri tipi koyuyorsak mesela bir değişken oluşturmuşuz onunla doğrulama yapıyoruz onada non-retrying (generic) assertions diyoruz

*/
