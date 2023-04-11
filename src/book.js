import React, { useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import './styles.css'
import music from "./music.mp3"
import { content } from "./content";
import useSound from "use-sound";
import { useAudioPlayer } from "react-use-audio-player"

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div
      className={"page page-cover page-cover-" + props.pos}
      ref={ref}
      data-density="hard"
    >
      <div className="page-content ">
        <h2 className="page-text-cover">{props.children}</h2>
      </div>
    </div>
  );
});

export const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref} style={{ padding: "10px" }}>
      <div className="page-content">
        <h2 className="page-header">{props.title}</h2>
        <div
          className="page-image"
          style={{ backgroundImage: "url(images/html/" + props.image + ")" }}
        ></div>
        <div className="page-text ">{props.children}</div>
        <div className="page-footer">{props.number + 1}</div>
      </div>
    </div>
  );
});
const Player = () => {
  const [play, { pause, duration, sound }] = useSound(music);

  useEffect(() => {
    play()
  }, [play])
  return (
    <div>
      {/* <iframe src={music} allow="autoplay" id="audio"></iframe> */}
      {/* <audio src={music} autoPlay={true} controls id="myAudio" /> */}
      {/* <p id="demo"></p> */}
    </div>
  )
}
export default class Passport extends React.Component {
  constructor(props) {
    super(props);

    const pages = [
      <PageCover key={0} pos="top">

      </PageCover>
    ];
    // pages.push(<Page1 />)
    for (let i = 0; i < content.length; i++) {
      pages.push(
        <Page key={i + 1} image={i + ".jpg"} number={i} title={content[i].title}>
          {content[i].content}
        </Page>
      );
    }

    pages.push(
      <PageCover key={101} pos="bottom">

      </PageCover>
    );
    pages.push(
      <PageCover key={101} pos="bottom-2">
        Together &#10084; Forever
      </PageCover>
    );
    this.state = {
      page: 0,
      totalPage: 0,
      orientation: "landscape",
      state: "read",
      pages: pages
    };
  }

  nextButtonClick = () => {
    this.flipBook.getPageFlip().flipNext();
  };

  prevButtonClick = () => {
    this.flipBook.getPageFlip().flipPrev();
  };

  onPage = (e) => {
    this.setState({
      page: e.data
    });
  };

  onChangeOrientation = (e) => {
    this.setState({
      orientation: e.data
    });
  };

  onChangeState = (e) => {
    this.setState({
      state: e.data
    });
  };

  componentDidMount() {
    this.setState({
      totalPage: this.flipBook.getPageFlip().getPageCount()
    });
  }

  render() {
    return (
      <>
        <div className="container-md" style={{ position: "relative", margin: "auto", border: "1px solid gray", marginTop: "150px" }}>
          <HTMLFlipBook
            width={550}
            height={900}
            size="stretch"
            minWidth={115}
            maxWidth={2000}
            minHeight={100}
            maxHeight={2533}
            maxShadowOpacity={0.5}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={this.onPage}
            onChangeOrientation={this.onChangeOrientation}
            onChangeState={this.onChangeState}
            className="flip-book html-book demo-book"
            style={{ backgroundImage: "url(images/background.jpg)" }}
            ref={(el) => (this.flipBook = el)}
          >
            {this.state.pages}
          </HTMLFlipBook>
        </div>
        <Player />
      </>
    );
  }
}
