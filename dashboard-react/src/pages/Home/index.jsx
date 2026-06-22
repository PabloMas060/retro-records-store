import { MusicList } from "../../components/MusicList";
import { MusicModalDetail } from "../../components/MusicModalDetail";
import { SearchForm } from "../../components/SearchForm";
import { Menu } from "../../components/Menu";

export const Home = () => {


  return (
    <>
        <section style={{
            textAlign: "center",
            marginBottom: "50px"
        }}>
            <h1
                style={{
                    color: "white",
                    fontWeight: "800",
                    fontSize: "3rem"
                }}
            >
                RETRO <span style={{ color: "#d6b05e" }}>RECORDS</span> PLAYER
            </h1>

            <p
                style={{
                    color: "#a7b0be"
                }}
            >
                Escuchá previews de Spotify directamente desde Retro Records
            </p>
        </section>

        <SearchForm />

        <MusicList />

        <MusicModalDetail />
    </>
)
}