import { Row } from "react-bootstrap"
import { MusicCard } from "../MusicCard"
import useMusic from "../../hooks/useMusic"
import styles from './index.module.css'

export const MusicList = () => {

    const { showData, loading } = useMusic()

    return (
        <div className="mt-5">

            {showData && showData.length > 0 && (
                <h2
                    style={{
                        color: "#fff",
                        marginBottom: "25px",
                        fontWeight: "700"
                    }}
                >
                    Resultados
                </h2>
            )}

            <Row className={`g-4 ${styles.fondo}`}>

                {
                    showData && showData.length === 0 ?

                        <div className={styles.messageBox}>
                            <h3>No encontramos resultados</h3>
                            <p>
                                Probá buscar otro artista o canción.
                            </p>
                        </div>

                        :

                        showData && loading === false ?

                            showData.map((music) => (
                                <MusicCard
                                    key={music.id}
                                    music={music}
                                />
                            ))

                            :

                            loading === true ?

                                <div className={styles.messageBox}>
                                    <h3>Buscando...</h3>
                                    <p>
                                        Consultando Spotify.
                                    </p>
                                </div>

                                :

                                <div className={styles.messageBox}>
                                    <h3>Retro Records Player</h3>
                                    <p>
                                        Buscá una canción, artista o álbum para comenzar.
                                    </p>
                                </div>
                }

            </Row>

        </div>
    )
}