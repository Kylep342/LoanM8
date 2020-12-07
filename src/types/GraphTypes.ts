/**
 * 
 */

export enum PlotTypes {
    Scatter = "scatter",
    Bar = "bar",
}

export enum BarModes {
    Stack = "stack",
}

//
export interface IDailyBalancePlotData {
    x: Date[];
    y: number[];
    name: string;
    type: PlotTypes;
    marker: {
        color: string;
    }
}

export interface IDailyBalancePlotLayout {
    title: string;
    yaxis: {
        hoverformat: string;
    }
}

export interface ILifetimeTotalsPlotData {
    x: string;
    y: number;
    marker: {
        color: string;
    }
}

export interface ILifetimeTotalsPlotLayout {
    title: string;
    barmode: BarModes;
    showlegend: boolean;
    yaxis: {
        hoverformat: string;
    }
}
