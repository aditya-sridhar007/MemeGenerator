import React from "react";

class MemeGenerator extends React.Component {
  constructor() {
    super();
    this.state = {
      topText: " ",
      bottomText: " ",
      randomImg: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: [],
    };
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((Response) => Response.json())
      .then((Response) => {
        const { memes } = Response.data;
        this.setState({ allMemeImgs: memes });
      });
    this.submitHandle = this.submitHandle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }
  submitHandle(event) {
    event.preventDefault();
    const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const randMemeImg = this.state.allMemeImgs[randNum].url;
    this.setState({ randomImg: randMemeImg });
  }

  render() {
    return (
      <div>
        <form className="meme-form" onSubmit={this.submitHandle}>
          <input
            type="text"
            name="topText"
            value={this.state.topText}
            placeholder="TOP TEXT"
            onChange={this.handleChange}
          />

          <input
            type="text"
            placeholder="BOTTOM TEXT"
            name="bottomText"
            value={this.state.bottomText}
            onChange={this.handleChange}
          />

          <button>GENERATE</button>
        </form>

        <div className="meme">
          <img src={this.state.randomImg} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}

export default MemeGenerator;
