import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true, //bunu true yaparsanız, testlerin hepsi aynı anda çalışır.
  //Bu da hızlı bir şekilde testlerin çalışmasını sağlar.
  //fakat bu durumda, testlerin birbirlerine olan bağımlılıklarını kontrol etmek zorlaşır.
  //Bu yüzden, testlerin birbirlerine olan bağımlılıklarını kontrol etmek için false yapabilirsiniz.
  //Bu durumda, testler sırayla çalışır.

  //***** buranın false olmasının worker le veya worker sayısıyla br alakası yok  , false olsa bile birden fazla worker çalışabiliyor*/

  /*

/*
paralel test herzaman iyi değil neden iyi değil ? eğer testlerimizi arasında bağımlılık varsa, bu problem luştururur

paralel test testlerin eşzamanlı olarak çalışması anlamına geliyor,   paralel olursa daha hızlı olur
/*


  
  fullyParallel: true ayarı, her testin tamamen bağımsız bir tarayıcı örneğinde çalıştırılmasını sağlar. 
  Bu, testlerin tamamen izole bir şekilde çalışmasını sağlar, yani bir testin diğer testler üzerinde yan etkisi olmaz.

fullyParallel: false ayarı ise, tüm testlerin aynı tarayıcı örneğinde çalıştırılmasını sağlar. 
Bu, testler arasında durum paylaşımına izin verir, ancak bu durum genellikle kaçınılması gereken bir durumdur çünkü 
testlerin birbirinden bağımsız olması genellikle daha iyidir.


  */

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI, //eğer CI'da çalışıyorsa, test.only kullanılmışsa hata verecek
  //eğer CI'da çalışmıyorsa, test.only kullanılmışsa hata vermeyecek

  /* Retry on CI only */ //burda ternery operatörü kullanılmış. Eğer CI'da çalışıyorsa 2 defa deneyecek, değilse 0 defa
  retries: process.env.CI ? 2 : 1, //eğer CI'da (Jenkins veya  githubActions) çalışıyorsa 2 defa deneyecek

  /* Opt out of parallel tests on CI.
  fully parallel özellğiğnin değeri true ise , testler koşulurken çalışacak olana işçi sayısını belirler
  */
  workers: process.env.CI ? 1 : 2, //eğer CI'da çalışıyorsa 1 işçi çalışacak, değilse undefined olacak
  //yani bu durumda, playwright kendi belirleyecek kaç işçi çalışacağını
  //biz belirlersek, bu durumda, playwright o işçi sayısına göre testleri paralel çalıştıracak
  //bizim bilgisayarımızın kapasitesine göre bize en uygun işçi sayısını belirler
  //biz undefined yerine 1 yazarsak, sadece 1 işçi çalışacak
  //default hali böyle ==> workers: process.env.CI ? 1 : undefined,
  //bir işçi bir browser açar

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [["html"], ["allure-playwright"]], //html, list, dot, json, junit, null
  //html: testlerin sonuçlarını html dosyasına yazdırır
  //list: testlerin sonuçlarını terminalde listeler
  //dot: testlerin sonuçlarını terminalde nokta ile listeler
  //json: testlerin sonuçlarını json dosyasına yazar
  //junit: testlerin sonuçlarını junit formatında xml dosyasına yazar
  //null: hiçbir şey yapmaz

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  use: {
    //video alma default olarak kapalı biz buraya   video: "on"  yazarak video yu aktif hale getirebiliriz
    //bu ayarlar, tüm projeler için geçerli olacak

    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    testIdAttribute: "data-test",
    video: "on-first-retry", //video almasını sağlar  ,  >>> **** bunun çalışabilmesi için testin terminalde çalıştırılması gerekiyor

    /*
video: {
    mode: 'on',
    size: { width: 1920, height: 1080 },
}
bu şekilde alınan videoyu özelliklerini değiştirebiliriz
    */

    //video: "on", //bütün testlerin videolarını alır
    //video: "off", //video almaz
    //video: "on-first-retry", //bir testin ilk başarısız denemesinden sonra video kaydetmeye başlar.
    //                         Yani, bir test başarısız olursa ve yeniden denenecekse (retry), bu yeniden deneme sırasında video kaydedilir.
    //video: "retain-on-failure", //sadece başarısız olan testlerin videolarını alır

    /*
    Her iki seçenek de başarısız olan testlerin videolarını alır, 
    ancak on-first-retry seçeneği sadece testin ilk başarısız denemesinden sonra video kaydederken, 
    retain-on-failure seçeneği her başarısızlık durumunda video kaydeder.

    */
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 }, //açılan page in boyutunu belirler
      }, //
    },

    {
      name: "mobile",
      use: {
        ...devices["iPhone 12 Pro"],
        //viewport: { width: 1920, height: 1080 }, //açılan page in boyutunu belirler
      }, //
    },

    {
      name: "deneme",
      use: {
        ...devices["chromium"],
        launchOptions: {
          args: ["--start-maximized"],
          //headless: false,
          //slowMo: 1000,
          // devtools: true,
        },
      }, //
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',   //bu komutu çalıştırarak, local sunucuyu başlatır"
  //   url: 'http://127.0.0.1:3000',   //bu url'e git
  //   reuseExistingServer: !process.env.CI,  //CI'da çalışmıyorsa, mevcut sunucuyu kullan
  //CI'da çalışıyorsa, yeni bir sunucu başlat
  // },
});
