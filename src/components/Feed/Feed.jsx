import "./Feed.css";
import thumbnail1 from "../../assets/thumbnail1.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_KEY } from "../../data";
import { value_converter } from "../../data";
import moment from "moment";

const Feed = ({ category }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=100&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;

    console.log("Fetching data from URL:", videoList_url);

    await fetch(videoList_url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setData(data.items);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="feed">
      {data.map((item, index) => {
        return (
          <Link
            to={`video/${item.snippet.categoryId}/${item.id}`}
            className="card"
          >
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>
              {value_converter(item.statistics.viewCount)} views &bull;{" "}
              {moment(item.snippet.publishedAt).fromNow()}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default Feed;
