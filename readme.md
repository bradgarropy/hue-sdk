# 💡 philips hue sdk

<a href="https://www.npmjs.com/package/@bradgarropy/hue-sdk">
    <img alt="npm" src="https://img.shields.io/npm/v/@bradgarropy/hue-sdk.svg?style=flat-square">
</a>

<a href="https://www.npmjs.com/package/@bradgarropy/hue-sdk">
    <img alt="npm" src="https://img.shields.io/npm/dt/@bradgarropy/hue-sdk?style=flat-square">
</a>

<a href="https://bundlephobia.com/result?p=@bradgarropy/hue-sdk">
    <img alt="npm" src="https://img.shields.io/bundlephobia/min/@bradgarropy/hue-sdk?style=flat-square">
</a>

<a href="https://github.com/bradgarropy/hue-sdk/actions">
    <img alt="npm" src="https://img.shields.io/github/workflow/status/bradgarropy/hue-sdk/release?style=flat-square">
</a>

<a href="https://www.typescriptlang.org/dt/search?search=%40bradgarropy%2Fhue-sdk">
    <img alt="npm" src="https://img.shields.io/npm/types/@bradgarropy/hue-sdk?style=flat-square">
</a>

<a href="https://bradgarropy.com/discord">
    <img alt="npm" src="https://img.shields.io/discord/748196643140010015?style=flat-square">
</a>

_[Philips Hue][hue] SDK for managing smart devices._

## 📦 Installation

This package is hosted on [npm][npm].

```bash
npm install @bradgarropy/hue-sdk
```

## 🚦 Setup

In order to use the Philips Hue API you must have a [Philips Hue Bridge][bridge] installed. You need the ip address and a user account to send commands to the bridge.

Locate the ip address by navigating to https://discovery.meethue.com in a web browser. This should respond with an array of all discovered bridges on your wifi network, typically there will only be one. You'll see the ip address in the `json` object which we will call the `HUE_BRIDGE_IP`.

```json
[
    {
        "id": "001728fdfe70920f",
        "internalipaddress": "192.168.84.129"
    }
]
```

Then navigate to `https://<BRIDGE_IP_ADDRESS>/debug/clip.html`. Use the API Debugger to create a new user as follows.

```
url:    /api
method: POST
body:   {"devicetype": "<USERNAME>"}
```

You should receive a response with the message `"link button not pressed"`.

Now go press the large button on top of your [Philips Hue Bridge][bridge], then send the same command again. You should get back a success message with a `username` property, this will be the `HUE_USERNAME`.

_You can find more information on the Philips Hue Developer [Get Started][get-started] page._

## 🥑 Usage

Now that all of the setup is done, here's how to send your first command to the bridge. Use the `HUE_BRIDGE_IP` and the `HUE_USERNAME` from the [Setup](#-setup) section above to initialize a `Hue` client.

```javascript
const Hue = require("@bradgarropy/hue-sdk")

const hue = new Hue(process.env.HUE_BRIDGE_IP, process.env.HUE_USERNAME)
const lights = await hue.readLights()

console.log(lights)
```

## 📖 API Reference

### `Hue(ip, username)`

| Name       | Example            | Description                  |
| ---------- | ------------------ | ---------------------------- |
| `ip`       | `"192.168.84.129"` | Philips Hue bridge ip.       |
| `username` | `"bradgarropy"`    | Philips Hue bridge username. |

```javascript
const hue = new Hue("192.168.84.129", "bradgarropy")
```

### `hue.readLight(id)`

| Name | Example    | Description |
| ---- | ---------- | ----------- |
| `id` | `"abc123"` | Light id.   |

Get all information for a specific light.

```javascript
hue.readLight("abc123")
```

### `hue.readLights()`

Get all information for all lights.

```javascript
hue.readLights()
```

### `hue.updateLight(id, state)`

| Name    | Example       | Description  |
| ------- | ------------- | ------------ |
| `id`    | `"abc123"`    | Light id.    |
| `state` | `{on: false}` | Light state. |

Update a light's state.

```javascript
hue.updateLight("abc123", {on: false})
```

### `hue.turnOnLight(id)`

| Name | Example    | Description |
| ---- | ---------- | ----------- |
| `id` | `"abc123"` | Light id.   |

Turn on a specific light.

```javascript
hue.turnOnLight("abc123")
```

### `hue.turnOnLights(ids)`

| Name | Example                | Description         |
| ---- | ---------------------- | ------------------- |
| `id` | `["abc123", "def456"]` | Array of light ids. |

Turn on multiple lights.

```javascript
hue.turnOnLights(["abc123", "def456"])
```

### `hue.turnOnAllLights()`

Turn on all lights.

```javascript
hue.turnOnAllLights()
```

### `hue.turnOffLight(id)`

| Name | Example    | Description |
| ---- | ---------- | ----------- |
| `id` | `"abc123"` | Light id.   |

Turn off a specific light.

```javascript
hue.turnOffLight("abc123")
```

### `hue.turnOffLights(ids)`

| Name | Example                | Description         |
| ---- | ---------------------- | ------------------- |
| `id` | `["abc123", "def456"]` | Array of light ids. |

Turn off multiple lights.

```javascript
hue.turnOffLights(["abc123", "def456"])
```

### `hue.turnOffAllLights()`

Turn off all lights.

```javascript
hue.turnOffAllLights()
```

### `hue.blinkLight(id, interval, count)`

| Name       | Required | Default | Example    | Description          |
| ---------- | -------- | ------- | ---------- | -------------------- |
| `id`       | `true`   |         | `"abc123"` | Light id.            |
| `interval` | `false`  | `500`   | `750`      | Time between blinks. |
| `count`    | `false`  | `1`     | `5`        | Number of blinks.    |

Blink a specific light.

```javascript
hue.blinkLight("abc123")
hue.blinkLight("abc123", 750)
hue.blinkLight("abc123", 750, 5)
```

### `hue.blinkLights(ids, interval, count)`

| Name       | Required | Default | Example                | Description          |
| ---------- | -------- | ------- | ---------------------- | -------------------- |
| `id`       | `true`   |         | `["abc123", "def456"]` | Array of light ids.  |
| `interval` | `false`  | `500`   | `750`                  | Time between blinks. |
| `count`    | `false`  | `1`     | `5`                    | Number of blinks.    |

Blink multiple lights.

```javascript
hue.blinkLights(["abc123", "def456"])
hue.blinkLights(["abc123", "def456"], 750)
hue.blinkLights(["abc123", "def456"], 750, 5)
```

### `hue.setBrightness(id, brightness)`

| Name         | Example    | Description               |
| ------------ | ---------- | ------------------------- |
| `id`         | `"abc123"` | Light id.                 |
| `brightness` | `128`      | Brightness level (1-254). |

Set the brightness of a specific light.

```javascript
hue.setBrightness("abc123", 128)
```

### `hue.setBrightnesses(ids, brightness)`

| Name         | Example                | Description               |
| ------------ | ---------------------- | ------------------------- |
| `id`         | `["abc123", "def456"]` | Array of light ids.       |
| `brightness` | `128`                  | Brightness level (1-254). |

Set the brightness of multiple lights.

```javascript
hue.setBrightnesses(["abc123", "def456"], 128)
```

### `hue.setColor(id, color)`

| Name    | Example    | Description  |
| ------- | ---------- | ------------ |
| `id`    | `"abc123"` | Light id.    |
| `color` | `"blue"`   | Light color. |

Set the color of a specific light.

Colors must be chosen from a preset list.

-   `random`
-   `white`
-   `red`
-   `orange`
-   `yellow`
-   `green`
-   `blue`
-   `purple`
-   `lime`
-   `teal`
-   `pink`

```javascript
hue.setColor("abc123", "blue")
```

### `hue.setColors(ids, color)`

| Name    | Example                | Description         |
| ------- | ---------------------- | ------------------- |
| `id`    | `["abc123", "def456"]` | Array of light ids. |
| `color` | `"blue"`               | Light color.        |

Set the color of multiple lights.

Colors must be chosen from a preset list.

-   `random`
-   `white`
-   `red`
-   `orange`
-   `yellow`
-   `green`
-   `blue`
-   `purple`
-   `lime`
-   `teal`
-   `pink`

```javascript
hue.setColors(["abc123", "def123"], "blue")
```

### `setRandomColor(id)`

| Name | Example    | Description |
| ---- | ---------- | ----------- |
| `id` | `"abc123"` | Light id.   |

Set a specific light to a random color.

```javascript
hue.setRandomColor("abc123")
```

### `setRandomColors(ids)`

| Name | Example                | Description         |
| ---- | ---------------------- | ------------------- |
| `id` | `["abc123", "def456"]` | Array of light ids. |

Set a multiple lights to a random color.

```javascript
hue.setRandomColors(["abc123", "def123"])
```

## ❔ Questions

🐛 report bugs by filing [issues][issues]  
📢 provide feedback with [issues][issues] or on [twitter][twitter]  
🙋🏼‍♂️ use my [ama][ama] or [twitter][twitter] to ask any other questions

[get-started]: https://developers.meethue.com/develop/get-started-2
[bridge]: https://www.philips-hue.com/en-us/p/hue-bridge/046677458478
[hue]: https://developers.meethue.com
[npm]: https://www.npmjs.com/package/@bradgarropy/hue-sdk
[issues]: https://github.com/bradgarropy/hue-sdk/issues
[twitter]: https://twitter.com/bradgarropy
[ama]: https://bradgarropy.com/ama
