function buildJobRepoSection(e, client) {
  const clientSection = CardService.newCardSection().setHeader("👤 Client saved in Getjobber");

  if (client) {
    const { firstName, lastName, address, jobs } = client;

    clientSection.addWidget(CardService.newTextParagraph().setText(
      `<b>${firstName} ${lastName}</b><br>`  
    ));

    // 📍 Address Section
    let addressSection = CardService.newCardSection().setHeader("📍 Property Address Info");
    if (address?.street || address?.city || address?.state) {
      addressSection.addWidget(CardService.newTextParagraph().setText(
        `${address.street || ''}, ${address.city || ''}, ${address.state || ''}`
      ));
    } else {
      addressSection.addWidget(CardService.newTextParagraph().setText(
        `No properties added yet for this client`
      ));
    }
    addressSection.addWidget(
      CardService.newTextButton()
        .setText("➕ Add New Address")
        .setTextButtonStyle(CardService.TextButtonStyle.FILLED).setBackgroundColor(setBackgroundColor())
        .setOnClickAction(CardService.newAction().setFunctionName("propertyAddressCard"))
    );

    // 📋 Jobs List Section
    let jobsListSection = CardService.newCardSection().setHeader("📋 Recent Jobs List");
    if (jobs && jobs.length > 0) {
      for (let i = 0; i < jobs.length; i++) {
        const job = jobs[i];
        
        const jobRow1 = 'Title:- ' + job.title;
        const jobRow2 = 'Type:- ' + job.jobType;
        const jobRow3 = 'Job Number:- ' + job.jobNumber;
        const jobRow4 = 'Status:- ' + job.jobStatus;
        jobsListSection.addWidget(CardService.newTextParagraph().setText(jobRow1));
        jobsListSection.addWidget(CardService.newTextParagraph().setText(jobRow2));
        jobsListSection.addWidget(CardService.newTextParagraph().setText(jobRow4));
        jobsListSection.addWidget(CardService.newTextParagraph().setText(jobRow3));
        jobsListSection.addWidget(CardService.newTextParagraph().setText('------------------------------------------------------'));
      }
    } else {
      jobsListSection.addWidget(CardService.newTextParagraph().setText(
        `No jobs yet`
      ));
    }
    jobsListSection.addWidget(
      CardService.newTextButton()
        .setText("📝 Add New Job")
        .setTextButtonStyle(CardService.TextButtonStyle.FILLED).setBackgroundColor(setBackgroundColor())
        .setOnClickAction(CardService.newAction().setFunctionName("jobCreationCard"))
    );

    // 📨 Requests List Section
    // let requestListSection = CardService.newCardSection().setHeader("📨 Recent Requests List");
    // if (requests && requests.length > 0) {
    //   requestListSection.addWidget(CardService.newTextParagraph().setText(
    //     '<b><font face="monospace">|Title|                 Status|</font></b>'
    //   ));
    //   for (let i = 0; i < requests.length; i++) {
    //     const req = requests[i];
    //     const reqRow = '<font face="monospace">' +
    //       pad(req.title || "Untitled", 22) + '---->' +
    //       (req.requestStatus || '') +
    //       '</font>';
    //     requestListSection.addWidget(CardService.newTextParagraph().setText(reqRow));
    //   }
    // } else {
    //   requestListSection.addWidget(CardService.newTextParagraph().setText(
    //     `Client hasn't requested any new work yet`
    //   ));
    // }
    // requestListSection.addWidget(
    //   CardService.newTextButton()
    //     .setText("➕ Add New Request")
    //     .setTextButtonStyle(CardService.TextButtonStyle.FILLED).setBackgroundColor(setBackgroundColor())
    //     .setOnClickAction(CardService.newAction().setFunctionName("newRequestCard"))
    // );

    return {
      client: clientSection,
      address: addressSection,
      jobs: jobsListSection,
      // requests: requestListSection
    };

  } else {
    clientSection.addWidget(CardService.newTextParagraph()
      .setText("⚠️ Client not found."));
    return { client: clientSection };
  }
}
