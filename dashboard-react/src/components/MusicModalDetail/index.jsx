import { Modal, Row, Col, Image } from 'react-bootstrap'
import styles from './index.module.css'
import useMusic from '../../hooks/useMusic'


export const MusicModalDetail = () => {

  const {
    showModal,
    handleShowModalClick,
    InfoForId,
    handlePlay,
    handlePause
  } = useMusic()



  return (
    <Modal show={showModal} onHide={handleShowModalClick} size='lg' className={styles.FlexModal}  >
      <Row className={styles.backgroundModal} >

        <Col className={styles.EffectAnimation}>
          <Image src={InfoForId ? InfoForId.album.images[0].url : ""} alt={`imagen de ${InfoForId ? InfoForId.artists[0].name : ""}`} fluid className={`rounded-start ${styles.ImgModal}`} />
        </Col>


        <Col className={styles.EffectAnimation}>
          <Modal.Header closeButton className={styles.FlexModalName}>

            {/* <button closeButton type='button' className='btn-close' aria-label='Close'></button> */}

          </Modal.Header>
          <Modal.Body>
            <Modal.Title className={styles.NameSong}>
              {InfoForId ? InfoForId.name : ""}
            </Modal.Title>

            <p className={styles.PopularityName}>
              {InfoForId ? InfoForId.artists[0].name : ""}
            </p>
            {/*           <div class="progress">
  <div class="progress-bar bg-success" role="progressbar" style={Stylexd} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
</div> */}
            <div className='d-flex'>
              <p className={styles.PopularityName} >Popularidad: {InfoForId ? InfoForId.popularity : ""}% </p>
              <progress className={styles.progress} value={InfoForId ? InfoForId.popularity : ""} max="100">{InfoForId ? InfoForId.popularity : ""}</progress>
            </div>
            <div>
              <audio controls className={styles.audioModal} onPlay={handlePlay} onPause={handlePause}>
                <source src={InfoForId ? InfoForId.preview_url : ""
                } type="audio/mp3" />

              </audio>


            </div>



          </Modal.Body>
        </Col>


      </Row>
    </Modal>
  )
}