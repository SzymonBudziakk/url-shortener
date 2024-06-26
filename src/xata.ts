// Generated by Xata Codegen 0.29.3. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "urls",
    columns: [
      { name: "userId", type: "string" },
      { name: "clicks", type: "int", notNull: true, defaultValue: "0" },
      {
        name: "fullUrl",
        type: "text",
        notNull: true,
        defaultValue: "https://www.google.com/",
      },
      {
        name: "shortUrl",
        type: "text",
        notNull: true,
        defaultValue: "https://www.google.com/",
      },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Urls = InferredTypes["urls"];
export type UrlsRecord = Urls & XataRecord;

export type DatabaseSchema = {
  urls: UrlsRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Szymon-Budziak-s-workspace-c8ipea.us-east-1.xata.sh/db/Url_Shortener",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
