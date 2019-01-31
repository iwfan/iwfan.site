interface IErrorLocationData {
  line: number;
  column: number;
}
interface IErrorData {
  message: string;
  locaionis: IErrorLocationData[];
  paths: Array<string | number>;
}
interface IAuthorData {
  name?: string;
  bio?: string;
  avatar?: string;
  email?: string;
}
interface IMenuData {
  title: string;
  path: string;
}
interface ISiteMetadata {
  title?: string;
  logo?: string;
  description?: string;
  keywords?: string[];
  author?: IAuthorData;
  menus?: IMenuData[];
}
interface ISiteMetaQuery {
  site: {
    siteMetadata: ISiteMetadata;
    buildTime?: string;
  };
}

interface IGatsbyProps {
  data: ISiteMetaQuery;
  children?: any;
  location: Location;
  path: string;
  uri: string;
  pageContext: any;
  pageResources: any;
  pathContext: any;
  navigate(to: string, options: object): void;
}
