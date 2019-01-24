let promptEvent;

let setAppNameBtn;
let addAppToDesktopBtn;
let input;

function generateManifest(app_name) {
    const myDynamicManifest = {
        "name": "Test Application",
        "short_name": "Test app",
        "scope": window.location.origin,
        "start_url": window.location.origin,
        "display": "standalone",
        "icons": [
            {
                "src":"https://cdn.slidesharecdn.com/profile-photo-HaydarIssa-48x48.jpg",
                "sizes": "48x48",
                "type": "image/png"
            },
            {
                "src": "https://simplabs.com/images/apple-144.png",
                "sizes": "144x144",
                "type": "image/png"
            },
            {
                "src": "https://ragingwind.gallerycdn.vsassets.io/extensions/ragingwind/web-manifest-snippets/0.1.0/1486690660169/Microsoft.VisualStudio.Services.Icons.Default",
                "sizes": "196x196",
                "type": "image/png"
            }
        ]
    };
    if (app_name) {
        myDynamicManifest.name = app_name
    }
    const stringManifest = JSON.stringify(myDynamicManifest);
    const blob = new Blob([stringManifest], {type: 'application/json'});
    const manifestURL = URL.createObjectURL(blob);
    document.querySelector('#custom-manifest').setAttribute('href', manifestURL);
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').then(
        (reg) => { console.log('SW registered!') },
        (err) => { console.log('SW not registered!', err) }
    )
}

window.addEventListener('DOMContentLoaded', () => {
    setAppNameBtn = document.querySelector('#set_app_name');
    addAppToDesktopBtn = document.querySelector('#add_app_to_desktop');
    input = document.querySelector('#app_name');

    generateManifest();

    setAppNameBtn.addEventListener('click', (e) => {
        e.preventDefault();
        generateManifest(input.value);
    });
    addAppToDesktopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        promptEvent.prompt();
    });
});

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    console.log(e);
    promptEvent = e;
});