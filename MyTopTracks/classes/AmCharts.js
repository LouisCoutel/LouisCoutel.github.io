import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Responsive from "@amcharts/amcharts5/themes/Responsive";

class AmMap {
    constructor(root) {
        this.root = am5.Root.new("chartdiv")
    }

    async buildSequence() {
        this.root.setThemes([
            am5themes_Animated.new(this.root),
            am5themes_Responsive.new(this.root)
        ]);

        this.buildChart()

        const geoOutline = await this.getGeoOutline()
        this.outlineSeries = await this.buildOutlineSeries(geoOutline)

        const geoCountries = await this.getGeoCountries()
        this.countriesSeries = await this.buildCountriesSeries(geoCountries)
        this.buildTooltip()
        this.countriesSeries.set("tooltip", this.tooltip)
        this.setOutlineSeries()
        this.countriesSeries.mapPolygons.template.states.create("hover", {
            fill: am5.color(0xffe500)
        })



    }


    buildChart() {
        this.chart = this.root.container.children.push(
            am5map.MapChart.new(this.root, {
                projection: am5map.geoMercator(),
                panX: "translateX",
                panY: "translateY",
                minZoomLevel: 0.9,
                maxZoomLevel: 5,
                zoomLevel: 0.9,
                rotationX: -10,
                wheelSensitivity: 0.7,
                wheel: "zoomX",
                maxPanOut: 0.07,
                paddingLeftLeft: "20px",
            })
        );
    }

    async getGeoOutline() {
        const worldOutlineLow = await import("@amcharts/amcharts5-geodata/worldOutlineLow")
        return worldOutlineLow.default
    }

    async buildOutlineSeries(geoData) {
        return this.chart.series.push(
            am5map.MapPolygonSeries.new(this.root, {
                geoJSON: geoData,
            })
        )

    }

    setOutlineSeries() {
        this.outlineSeries.mapPolygons.template.setAll({
            shadowColor: am5.color(0x000000),
            shadowBlur: 10,
            shadowOffsetY: 4,
            shadowOffsetX: 0,
            shadowOpacity: 0.4,
        });
    }

    async getGeoCountries() {
        const am5geodata_worldLow = await import("@amcharts/amcharts5-geodata/worldLow")
        return am5geodata_worldLow.default
    }

    async buildCountriesSeries(geoData) {
        return this.chart.series.push(
            am5map.MapPolygonSeries.new(this.root, {
                geoJSON: geoData,
                exclude: ["AQ"],
                fill: am5.color(0xedeae0),
            })
        )
    }

    setCountriesData(data) {
        this.countriesSeries.mapPolygons.template.setAll({ templateField: "enabledSettings" })
        this.countriesSeries.data.setAll(data)
    }


    buildTooltip() {
        this.tooltip = am5.Tooltip.new(this.root, {
            getFillFromSprite: false,
            labelText: '{"id"}',
        });

        this.tooltip.get("background").setAll({
            strokeOpacity: 0,
        });
    }
}

export default AmMap