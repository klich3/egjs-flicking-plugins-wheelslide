/*
█▀ █▄█ █▀▀ █░█ █▀▀ █░█
▄█ ░█░ █▄▄ █▀█ ██▄ ▀▄▀

Author: <Anton Sychev> (anton at sychev dot xyz)
fade.ts (c) 2024
Created:  2024-05-28 19:12:04 
Desc: Flicking scroll slide plugin, now you can scroll slides with mouse wheel up and down
Docs: 
	* https://naver.github.io/egjs-flicking/docs/api/Flicking#activePlugins
*/

import Flicking, { Plugin } from "@egjs/flicking";

class WhellSlide implements Plugin {
	private _flicking: Flicking | null;
	private _ele: HTMLElement | null;
	private _horizontal: boolean;

	set horizontal(value: boolean) {
		this._horizontal = value;
	}

	get horizontal(): boolean {
		return this._horizontal;
	}

	/**
	 * Create a new WhellSlide plugin
	 * @param {boolean} horizontal - Scroll direction, default is false
	 * @example
	 * ```ts
	 * import WhellSlide from "@/plugins/flicking/WhellSlide";
	 * flicking.addPlugins(new WhellSlide(true|false));
	 * ```
	 */
	public constructor(horizontal: boolean = false) {
		this._flicking = null;
		this._horizontal = horizontal;
	}

	public init(flicking: Flicking): void {
		if (this._flicking) this.destroy();

		this._flicking = flicking;
		this._ele = flicking.element;

		this._ele.addEventListener("wheel", (e: WheelEvent) => {
			const cameraPos = this._flicking.camera.position;
			const scrollDir = this._horizontal ? e.deltaX : e.deltaY;
			this._flicking.control.controller.axes.setTo(
				{ flick: cameraPos + scrollDir },
				0
			);
		});
	}

	public destroy(): void {
		if (!this._flicking) return;
		this._flicking = null;
		this._ele.addEventListener("wheel", () => {});
	}
}

export default WhellSlide;
