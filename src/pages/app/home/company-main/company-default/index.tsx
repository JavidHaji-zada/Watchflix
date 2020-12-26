import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import SearchBar from "material-ui-search-bar";
import { MediaProduct } from "../../../../../shared/models/media-product";


function onMoviePressed(media: MediaProduct): void {

}
function Default(): JSX.Element {
    const [products, setProducts] = useState<MediaProduct[]>([]);
    useEffect(() => {
        // get last uploaded files
        let products = []
        let mediaProduct1 = new MediaProduct({ _id: 'id1', score: 5, release_date: new Date(), name: 'Kung Fu Panda', thumbnail_url: 'https://img1.evosis.org/movie/629/icon/icon0.png' })
        let mediaProduct2 = new MediaProduct({ _id: 'id2', score: 5, release_date: new Date(), name: 'Inception', thumbnail_url: 'https://bsaber.com/wp-content/uploads/2019/05/18598-20226.jpg' })
        let mediaProduct3 = new MediaProduct({ _id: 'id3', score: 4.7, release_date: new Date(), name: 'Tenet', thumbnail_url: 'https://images.pexels.com/users/avatars/3485071/watch-online-tenet-2020-free-hd-full-movie-969.jpeg?w=256&h=256&fit=crop&auto=compress' })
        products.push(mediaProduct1, mediaProduct2, mediaProduct3)
        setProducts(products)
    }, [])
  return (
    <div style={{ ...styles.big_container, flexDirection: "column" }}>
        <div style={{ ...styles.container, flexDirection: "row" }}>
            <Button variant= "danger">
                Publish New Media
            </Button>
    
            <SearchBar
              onChange={() => console.log('onChange')}
              onRequestSearch={() => console.log('onRequestSearch')}
              placeholder = {"Titles"}
            ></SearchBar>
        </div>

        <h2 style = {{fontSize: 24, color: "white", marginTop: 36}}>Last uploaded media products</h2>
        <div>
            {products.map(media => (
                <button style={styles.movie_button} onClick={() => onMoviePressed(media)}>
                    <img style={styles.thumbnailStyle} src={media.thumbnail_url} />
                </button>
            ))}
        </div>       
        
    </div>
  );
}

const styles = {
    container: {
      flex: 1,
      display: "flex",
      justifyContent: "space-between",
      paddingLeft: 2,
      paddingRight: 2,
      paddingTop: 2,
      width: "100%",
    },
    big_container: {
        flex: 1,
        display: "flex",
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 8,
        width: "100%",
      },
      button: {
        backgroundColor: "red",
        color: "white", 
        borderWidth: 3, 
        borderColor: "black" , 
        fontStyle: "bold",
      },
      movie_button: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
      thumbnailStyle: {
        width: 128,
        height: 128,
    },
  };

export default Default;
