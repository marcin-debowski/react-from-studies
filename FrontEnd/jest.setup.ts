import "@testing-library/jest-dom";
import { text } from "stream/consumers";

import { TextEncoder, TextDecoder } from "util";
global.TextDecoder = TextDecoder;
global.TextEncoder = TextEncoder;
