# Long Read Alignment Plotting

This visualisation plots primary and supplementary alignments from BAM files
to facilitate the interpretation of structural variants.

To make a plot, use the file selector below to select a BAM file of long read
alignments, and it's corresponding BAI file. Both must be provided. The app will
read parts of the BAM file into the browser, but it does not transport any data
outside the browser, so as to make sure patient privacy is preserved for clinical
samples.

You should then put the locus of interest into the input box below. This should
be in the format `chrom:start-end`, as you may use for IGV or the UCSC
browser. When you click "Scan Alignments", the app will scan the BAM file and
identify all the reads that intersect the given locus, and gather up all the
primary and supplementary alignments for those read in order to generate the plot.

If the region of interest has a large footprint on the reference, it can take a long
time to scan all the reads, most of which may not be of interest to interpreting the
structural event, so you may find it more satisfactory to start with a locus of a
few hundred base pairs around one or other end of the region.

Once you have an initial plot, you can use the table below to selectively flip the
orientation of reads for clarity, and selectively hide them to reduce clutter.
The line segments in the plot are clickable, which brings up a panel with controls
to allow you to "mute" (hide) a read, "solo" it (hide all the other reads), and
copy the read ID to the clipboard.

The camera icon in the top right of the plot opens a new window/tab with the plot as
an image that you can save or copy for use in documents/presentations.

## Installation

To build and run the tool locally, use `npm`.

```bash
npm install

npm run dev
```

## Github Pages

Because this is a static site, you can run it off Github Pages at <https://drtconway.github.io/long-read-plotting/>.
