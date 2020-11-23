import React from 'react';

import styles from './styles';

function About(): JSX.Element {

    return (
        <div id="about" className="container">
            <div className="infoText" style={styles.infoTextContainer}>
                <h1>About</h1>
                <p style={styles.infoText}>
                    Watchflix is
                    going to provide a variety of functionalities for the users. The main aim of this application is to
                    provide users with the latest high-quality movies and series. The user will be able to enjoy
                    his/her favorite movies and series smoothly. The application will have features like listing and
                    searching movies and series based on their genre or name. It will also be available for the users
                    to specify their preferences based on the genre. Then, this application will prepare suggestions
                    based on the preferences of the user for the better user experience. Besides, like, dislike and
                    3
                    comment functionalities will be provided so that the users can give feedback to films and series
                    they watched.
                </p>
            </div>
        </div>
    )
}


export default About;