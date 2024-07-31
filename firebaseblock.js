        // Your web app's Firebase configuration
        const firebaseConfig = {
        apiKey: "AIzaSyBWHxOJ3_hMpU18JM_mSir0tk7olPec3zw",
        authDomain: "ath-membership.firebaseapp.com",
        projectId: "ath-membership",
        storageBucket: "ath-membership.appspot.com",
        messagingSenderId: "612489978020",
        appId: "1:612489978020:web:b9aa0a9a7306b16d4d8631"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        const auth = firebase.auth();

        const nonSubscriberContent = `
            <p>This content is for subscribers only.</p>
            <button id="login-button">Login</button>
        `;

        async function isAuthenticatedWithFirebase() {
            return new Promise((resolve, reject) => {
                auth.onAuthStateChanged((user) => {
                    if (user) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                });
            });
        }

        async function gateContent() {
            var transcript = document.querySelector('[itemprop="transcript"]');
            if (transcript) {
                const isAuthenticated = await isAuthenticatedWithFirebase();
                if (isAuthenticated) {
                    // User is authenticated, show the original content
                    transcript.style.display = 'block';
                    console.log('User authenticated, showing content.');
                } else {
                    // Store original content
                    var originalContent = transcript.innerHTML;

                    // Create the content-gate element
                    var contentGate = document.createElement('div');

                    // Create and append the unavailable slot div
                    var unavailableDiv = document.createElement('div');
                    unavailableDiv.innerHTML = nonSubscriberContent;
                    contentGate.appendChild(unavailableDiv);

                    // Replace the original content with the content-gate element
                    transcript.style.display = 'none'; // Hide the original content
                    transcript.parentNode.insertBefore(contentGate, transcript);
                    console.log('User not authenticated, showing login button.');

                    // Add event listener to the login button
                    const loginButton = document.getElementById('login-button');
                    if (loginButton) {
                        loginButton.addEventListener('click', startFirebaseLogin);
                    } else {
                        console.error('Login button not found.');
                    }
                }
            } else {
                console.error('Transcript element not found');
            }
        }

        function startFirebaseLogin() {
            const email = prompt('Please enter your email:');
            if (email) {
                const actionCodeSettings = {
                    url: window.location.href,
                    handleCodeInApp: true
                };
                auth.sendSignInLinkToEmail(email, actionCodeSettings)
                    .then(() => {
                        window.localStorage.setItem('emailForSignIn', email);
                        alert('Check your email for the magic link!');
                    })
                    .catch((error) => {
                        console.error('Error sending email link', error);
                    });
            }
        }

        window.addEventListener('load', async () => {
            const urlParams = new URLSearchParams(window.location.search);
            if (auth.isSignInWithEmailLink(window.location.href)) {
                let email = window.localStorage.getItem('emailForSignIn');
                if (!email) {
                    email = prompt('Please provide your email for confirmation');
                }
                try {
                    await auth.signInWithEmailLink(email, window.location.href);
                    window.localStorage.removeItem('emailForSignIn');
                } catch (error) {
                    console.error('Error signing in with email link', error);
                }
            }

            // Gate content based on authentication
            gateContent();
        });
