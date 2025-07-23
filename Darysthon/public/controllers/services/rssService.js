import fetch from "node-fetch";
import xml2js from "xml2js";
import AWS from "aws-sdk";

const RSS_URL = "https://res.stj.jus.br/hrestp-c-portalp/RSS.xml";
const BUCKET_NAME = process.env.S3_BUCKET_NAME;
const FILE_NAME = "rss-data.json";

AWS.config.update({ region: process.env.AWS_REGION });

const s3 = new AWS.S3();

export async function fetchRSSFeed() {
  const res = await fetch(RSS_URL);
  const xml = await res.text();
  const result = await xml2js.parseStringPromise(xml);
  const items = result.rss.channel[0].item.map(item => ({
    title: item.title[0],
    link: item.link[0],
    pubDate: item.pubDate[0],
    description: item.description[0]
  }));
  return items;
}

export async function saveJSONToS3(data) {
  const params = {
    Bucket: BUCKET_NAME,
    Key: FILE_NAME,
    Body: JSON.stringify(data, null, 2),
    ContentType: "application/json"
  };
  await s3.putObject(params).promise();
}

export async function getJSONFromS3() {
  const params = {
    Bucket: BUCKET_NAME,
    Key: FILE_NAME
  };
  const result = await s3.getObject(params).promise();
  return JSON.parse(result.Body.toString());
}