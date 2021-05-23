# Vaccine Tracker Canada

This a widget for [Übersicht](http://tracesof.net/uebersicht/) that displays a vaccination percentation in canada from [https://api.covid19tracker.ca/docs/1.0/summary](https://api.covid19tracker.ca/docs/1.0/summary)

## Installion

Download the vaccine-tracker-canada.zip and unzip it to your widgets folder (default: ~/Library/Application Support/Übersicht/widgets).

## Preview

![vaccine-tracker-canada.widget preview](vaccine-tracker-canada.png)

## Settings

### Refresh time

A request is made every 6 hours, this is because I am not connected all day long so this make sure that the tracker is updated everyday. You might want to set it to higher number

	// the refresh frequency in milliseconds
	// 21600000 = every 6h Default
	// 43200000 = every 12h
	// 86400000 = every 24h / day
	export const refreshFrequency = 21600000;

### Quote

The plugin use the public API no need for a key, the is retrieve from a category.

## Disclamer

I am not a react developer so, the widget might not be optimize I just edit the default file and throw in some Vanilla JavaScript.
I use localStorage to limit the amount of request to the end point and to have the quote even when the network is down.

## To Do

- [] Generalize the country for people interested in other countries.
- [] Errors handling
- [] A fancy desing (maybe)😃